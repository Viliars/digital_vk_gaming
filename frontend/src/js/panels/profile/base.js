import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {Div, Panel, Group, Button, PanelHeader, Avatar, Cell, Text, SimpleCell, Header, Link, HorizontalScroll} from "@vkontakte/vkui"
import bridge from "@vkontakte/vk-bridge";
import Icon28EditOutline from '@vkontakte/icons/dist/28/edit_outline';
import axios from 'axios';
import GamesList from "../games/base";

const ProfileBase = ({id}) => {

    /*----Изменить на false для запуска внутри VK------*/

    ProfileBase.IS_MOCK = true

    /*-------------------------------------------------*/

    ProfileBase.URL = "https://agile-help.ru/"

    const [vkUser, setVkUser] = useState(null);
    const [serverUser, setServerUser] = useState(null);

    const startParams = new URLSearchParams(window.location.search)
    const userId = startParams.get("vk_user_id")
    ProfileBase.userId = userId

    useEffect(() => {
        if (ProfileBase.IS_MOCK) {
            setVkUser(mock_vkUser)
            setServerUser(mock_serverUser)
        } else {
            async function fetchVkData() {
                const user = await bridge.send('VKWebAppGetUserInfo');
                setVkUser(user);
            }
            fetchVkData()

            const userId = ProfileBase.userId

            axios.get(ProfileBase.URL+"get_user/"+userId)
                .then((response) => {
                    setServerUser(response.data)
                })
        }

    }, []);

    return (
        <Panel id={id}>
            <PanelHeader>Мой профиль</PanelHeader>
            {vkUser &&
            <Group>
                <SimpleCell
                    before={vkUser.photo_200 ? <Avatar size={72} src={vkUser.photo_200}/> : null}
                    after={<Icon28EditOutline/>} description={(serverUser === null) ? "" : serverUser.description}>
                    {<Text weight="semibold">{(serverUser === null) ? vkUser.first_name + "_" + vkUser.last_name : serverUser.nickname}</Text>}
                </SimpleCell>
            </Group>}
            {serverUser &&
            <Group header={<Header mode="secondary">Ссылки на профили</Header>}>
                <Cell before={<Avatar size={24} src={logo_links.steam}/>}><Link href={`https://steamcommunity.com/id/${serverUser.links.steam}`} target="_blank"><Text weight="semibold">{serverUser.links.steam}</Text></Link></Cell>
                <Cell before={<Avatar size={24} src={logo_links.discord}/>}><Link href="https://discord.com" target="_blank"><Text weight="semibold">{serverUser.links.discord}</Text></Link></Cell>
                <Cell before={<Avatar size={24} src={logo_links.twitch}/>}><Link href={`https://twitch.tv/${serverUser.links.twitch}`} target="_blank"><Text weight="semibold">{serverUser.links.twitch}</Text></Link></Cell>
            </Group>}
            <Group header={<Header mode="secondary">Мои игры</Header>}>
                {serverUser &&
                <HorizontalScroll>
                    <div style={{ display: 'flex' }}>
                        {serverUser.games.map(game => (
                            <div style={itemStyle}>
                                <Avatar size={64} src={getGameImage(game)} style={{ marginBottom: 8 }}/>
                            </div>
                        ))}
                    </div>
                </HorizontalScroll>}
            </Group>
            <Group header={<Header mode="secondary">Скиллы</Header>} >
                {serverUser &&
                <Div>
                    {serverUser.skills.map(skill => (
                        <Button mode="outline" style={{margin: 3}} after={<Text weight="semibold" style={{"color": "red"}}>{skill.count}</Text>} size="l">{skill.title}</Button>
                    ))}
                </Div>}
            </Group>
            <Group header={<Header mode="secondary">Достижения</Header>}>
                {serverUser &&
                <HorizontalScroll>
                    <div style={{ display: 'flex' }}>
                        {serverUser.awards.map(award => (
                            <div style={itemStyle}>
                                <Avatar size={64} src={award.imgSrc} style={{ marginBottom: 8 }}/>
                            </div>
                        ))}
                    </div>
                </HorizontalScroll>}
            </Group>
        </Panel>
    );

}

ProfileBase.propTypes = {
    id: PropTypes.string.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
};

export default ProfileBase;

const itemStyle = {
    flexShrink: 0,
    width: 80,
    height: 94,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 12
};

function getGameImage(id) {
    const gamelib = GamesList.games
    console.log(id)
    for (let i = 0; i < gamelib.length; i++) {
        if (gamelib[i].id === id)
            return gamelib[i].img
    }
    return null
}

const logo_links = {
    "steam" : "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/512px-Steam_icon_logo.svg.png",
    "discord" : "https://i2.wp.com/nopcproblem.ru/wp-content/uploads/2019/05/discord-logo.png?ssl=1",
    "twitch" : "https://img.streamdj.ru/f6bb31cfea23debdc091e4595fdd9018.png",
    "winner1" : "https://www.freepngimg.com/thumb/winner/3-2-winner-png-image.png",
    "winner2" : "https://i7.pngflow.com/pngimage/165/784/png-brazil-playerunknown-s-battlegrounds-electronic-sports-game-twitch-winner-winner-chicken-clipart.png",
    "winner3" : "https://w7.pngwing.com/pngs/884/120/png-transparent-counter-strike-global-offensive-video-game-call-of-duty-black-ops-iii-mascot-electronic-sports-others-miscellaneous-team-logo.png",
    "winner4" : "https://upload.wikimedia.org/wikipedia/ru/b/b2/%D0%A4%D0%9A_%D0%92%D0%B8%D0%BD%D0%B5%D1%80-%D0%9D%D0%BE%D0%B9%D1%88%D1%82%D0%B0%D0%B4%D1%82.png",
    "winner5" : "https://img.favpng.com/3/21/16/medal-winner-logo-badge-png-favpng-AvSYD6jfU7nr8kYqZS46DfiqX.jpg"
}

const mock_vkUser = {
    "id": 2314852,
    "first_name": "Макс",
    "last_name": "Аминов",
    "sex": 1,
    "city": {
        "id": 2,
        "title": "Санкт-Петербург"
    },
    "country": {
        "id": 1,
        "title": "Россия"
    },
    "bdate": "10.4.1990",
    "photo_100": "https://sun1-93.userapi.com/4XcfVflpQSxYc8eT4CAjmutXpN639oCa3_EZkA/ogSUQdL-REk.jpg",
    "photo_200": "https://sun1-93.userapi.com/4XcfVflpQSxYc8eT4CAjmutXpN639oCa3_EZkA/ogSUQdL-REk.jpg",
    "timezone": 3
}

const mock_serverUser = {
    "id" : 2314852,
    "nickname" : "zortan3301",
    "description" : "ММР 5000, 6к часов",
    "links" : {
        "steam" : "zortan3301",
        "discord" : "max_aminov",
        "twitch" : "twitcher3000"
    },
    "skills": [
        {
            "title" : "Аим",
            "count" : 1
        },
        {
            "title" : "Стелс",
            "count" : 10
        },
        {
            "title" : "Дружелюбность",
            "count" : 15
        },
        {
            "title" : "Реакция",
            "count" : 4
        }
    ],
    "awards": [
        {
            "title" : "",
            "imgSrc" : "https://www.freepngimg.com/thumb/winner/3-2-winner-png-image.png"
        }
    ],
    "games": [0, 7, 2, 4, 5, 6]
}
