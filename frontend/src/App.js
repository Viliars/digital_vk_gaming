import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {goBack, closeModal, setStory} from "./js/store/router/actions";
import {getActivePanel} from "./js/services/_functions";
import * as VK from './js/services/VK';

import {Epic, View, Root, Tabbar, ModalRoot, TabbarItem, ConfigProvider} from "@vkontakte/vkui";

import Icon28Profile from '@vkontakte/icons/dist/28/profile';
import Icon28Users3Outline from '@vkontakte/icons/dist/28/users_3_outline';
import Icon28GameOutline from '@vkontakte/icons/dist/28/game_outline';

import ProfilePanelBase from './js/panels/profile/base';

import MorePanelBase from './js/panels/teammates/base';
import MorePanelExample from './js/panels/teammates/example';

import GamesPanelBase from './js/panels/games/base';

import HomeBotsListModal from './js/components/modals/HomeBotsListModal';
import HomeBotInfoModal from './js/components/modals/HomeBotInfoModal';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.lastAndroidBackAction = 0;
    }

    componentDidMount() {
        const {goBack, dispatch} = this.props;

        dispatch(VK.initApp());

        window.onpopstate = () => {
            let timeNow = +new Date();

            if (timeNow - this.lastAndroidBackAction > 500) {
                this.lastAndroidBackAction = timeNow;

                goBack();
            } else {
                window.history.pushState(null, null);
            }
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {activeView, activeStory, activePanel, scrollPosition} = this.props;

        if (
            prevProps.activeView !== activeView ||
            prevProps.activePanel !== activePanel ||
            prevProps.activeStory !== activeStory
        ) {
            let pageScrollPosition = scrollPosition[activeStory + "_" + activeView + "_" + activePanel] || 0;

            window.scroll(0, pageScrollPosition);
        }
    }

    render() {
        const {goBack, setStory, closeModal, popouts, activeView, activeStory, activeModals, panelsHistory, colorScheme} = this.props;

        let history = (panelsHistory[activeView] === undefined) ? [activeView] : panelsHistory[activeView];
        let popout = (popouts[activeView] === undefined) ? null : popouts[activeView];
        let activeModal = (activeModals[activeView] === undefined) ? null : activeModals[activeView];

        const homeModals = (
            <ModalRoot activeModal={activeModal}>
                <HomeBotsListModal
                    id="MODAL_PAGE_BOTS_LIST"
                    onClose={() => closeModal()}
                />
                <HomeBotInfoModal
                    id="MODAL_PAGE_BOT_INFO"
                    onClose={() => closeModal()}
                />
            </ModalRoot>
        );

        return (
            <ConfigProvider isWebView={true} scheme={colorScheme}>
                <Epic activeStory={activeStory} tabbar={
                    <Tabbar>
                        <TabbarItem
                            onClick={() => setStory('profile', 'base')}
                            selected={activeStory === 'profile'}>
                                <Icon28Profile/>
                        </TabbarItem>
                        <TabbarItem
                            onClick={() => setStory('teammates', 'callmodal')}
                            selected={activeStory === 'teammates'}>
                                <Icon28Users3Outline/>
                        </TabbarItem>
                        <TabbarItem
                            onClick={() => setStory('games', 'base')}
                            selected={activeStory === 'games'}>
                                <Icon28GameOutline/>
                        </TabbarItem>
                    </Tabbar>
                }>
                    <Root id="profile" activeView={activeView} popout={popout}>
                        <View
                            id="profile"
                            modal={homeModals}
                            activePanel={getActivePanel("profile")}
                            history={history}
                            onSwipeBack={() => goBack()}
                        >
                            <ProfilePanelBase id="base" withoutEpic={false}/>
                        </View>
                    </Root>
                    <Root id="teammates" activeView={activeView} popout={popout}>
                        <View
                            id="teammates"
                            modal={homeModals}
                            activePanel={getActivePanel("teammates")}
                            history={history}
                            onSwipeBack={() => goBack()}
                        >
                            <MorePanelBase id="callmodal"/>
                        </View>
                        <View
                            id="modal"
                            modal={homeModals}
                            activePanel={getActivePanel("modal")}
                            history={history}
                            onSwipeBack={() => goBack()}
                        >
                            <MorePanelExample id="filters"/>
                        </View>
                    </Root>
                    <Root id="games" activeView={activeView} popout={popout}>
                        <View
                            id="games"
                            modal={homeModals}
                            activePanel={getActivePanel("games")}
                            history={history}
                            onSwipeBack={() => goBack()}
                        >
                            <GamesPanelBase id="base" withoutEpic={false}/>
                        </View>
                    </Root>
                </Epic>
            </ConfigProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        activeView: state.router.activeView,
        activeStory: state.router.activeStory,
        panelsHistory: state.router.panelsHistory,
        activeModals: state.router.activeModals,
        popouts: state.router.popouts,
        scrollPosition: state.router.scrollPosition,

        colorScheme: state.vkui.colorScheme
    };
};


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({setStory, goBack, closeModal}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
