import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';

import {Avatar, Panel, PanelHeader, SimpleCell, View} from "@vkontakte/vkui"

import Icon28ArrowLeftOutline from '@vkontakte/icons/dist/28/arrow_left_outline';
import Icon24FavoriteOutline from '@vkontakte/icons/dist/24/favorite_outline';
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import CellButton from "@vkontakte/vkui/dist/components/CellButton/CellButton";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Header from "@vkontakte/vkui/dist/components/Header/Header";
import axios from 'axios';

import ProfileBase from '../profile/base';

class GamesList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            activePanel: 'list',
            game: 'cs go',
            user_id: ProfileBase.userId,
            users: []
        };

    }

    render() {

        return (
            <View activePanel={this.state.activePanel}>
                <Panel id="list">
                    <PanelHeader>
                        Выберите игру
                    </PanelHeader>
                    {
                        gamelib.map(game => (
                            <SimpleCell key={game.id} onClick={() => {
                                this.setState({ activePanel: 'gamepanel', game: game});
                                if (ProfileBase.IS_MOCK) {
                                    this.setState({users: mock_Players})
                                } else {
                                    axios.get(ProfileBase.URL+"get_users?game_id="+game.id)
                                        .then(response => this.setState({users: response.data}))
                                }
                                }} expandable
                                        before={<Avatar size={48} src={game.img}/>}>{game.title}</SimpleCell>
                        ))
                    }
                </Panel>
                <Panel id="gamepanel">
                    <PanelHeader left={<PanelHeaderButton><Icon28ArrowLeftOutline onClick={this.props.goBack}/></PanelHeaderButton>}>
                        {this.state.game.title}
                    </PanelHeader>
                    <CellButton onClick={() => addToFavorite(this.state.user_id, this.state.game.id)} before={<Icon24FavoriteOutline/>}>Добавить в избранное</CellButton>
                    <Group header={<Header mode="secondary">Игроки</Header>}>
                        {
                            this.state.users.map(
                                player => (
                                    <SimpleCell onClick={() => window.location.href=`https://www.vk.com/id${player.id}`}
                                                key={player.id} expandable
                                                before={<Avatar size={48} src="https://pbs.twimg.com/profile_images/932564607918419973/mP_puwUi_400x400.jpg"/>}>{player.nickname}</SimpleCell>
                                )
                            )
                        }
                    </Group>
                </Panel>
            </View>
        )
    }
}

function addToFavorite(user_id, game_id) {
    axios.get(ProfileBase.URL+"add_favorites?user_id="+user_id+"&game_id="+game_id)
        .then((response) => {})
}

const gamelib = [
    {
        id: 0,
        title: 'CS:GO',
        img: 'https://www.meme-arsenal.com/memes/d81f1fc73c38e2cfacbd493b5d58509c.jpg',
    },
    {
        id: 1,
        title: 'Dota 2',
        img: 'https://cdnb.artstation.com/p/assets/images/images/003/638/701/large/yusif-alomeri-dota-emoticons-icon-circle.jpg',
    },
    {
        id: 2,
        title: 'Overwatch',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Overwatch_circle_logo.svg/1200px-Overwatch_circle_logo.svg.png',
    },
    {
        id: 3,
        title: 'PUBG',
        img: 'https://prodigits.co.uk/thumbs/wallpapers/p2/games/29/4543a93012322639.jpg',
    },
    {
        id: 4,
        title: 'Valorant',
        img: 'https://files.cults3d.com/uploaders/15024335/illustration-file/a86d53e4-2bd9-4a8f-9550-986686c3131a/gi0mAjIh_400x400_large.png',
    },
    {
        id: 5,
        title: 'Apex Legends',
        img: 'https://i.pinimg.com/564x/46/0e/78/460e78cb4c61f55da3802ca5d1d68d15.jpg',
    },
    {
        id: 6,
        title: 'Dead By Daylight',
        img: 'https://i.pinimg.com/originals/c2/26/70/c226703be9c534fd960290e3d61dd70e.png',
    },
    {
        id: 7,
        title: 'World Of Tanks',
        img: 'https://i.pinimg.com/originals/2b/08/77/2b0877b745d40b72590ddc12ee95065c.jpg',
    },
    {
        id: 8,
        title: 'League of Legends',
        img: 'https://i.pinimg.com/originals/a2/ea/c1/a2eac1e1644fad2ab6253e7562ebba00.png',
    },
    {
        id: 9,
        title: 'Fortnite',
        img: 'https://wallpapercave.com/wp/wp3726869.jpg',
    }
]

GamesList.games = gamelib

const mock_Players = [
    {
        "id" : "196406333",
        "nickname" : "kappaVamp"
    },
    {
        "id" : "984564141",
        "nickname" : "flowerG5"
    },
    {
        "id" : "746584478",
        "nickname" : "CORONoVIRUS"
    },
    {
        "id" : "7496058440",
        "nickname" : "mirey_"
    },
    {
        "id" : "0545604",
        "nickname" : "zortan3301"
    },{
        "id" : "468046468",
        "nickname" : "C4RL__"
    },
    {
        "id" : "98416104",
        "nickname" : "2sgeee"
    },
]

const mapDispatchToProps = {
    setPage,
    goBack,
    openPopout,
    closePopout,
    openModal
};

export default connect(null, mapDispatchToProps)(GamesList);