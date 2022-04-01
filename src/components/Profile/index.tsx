import React from 'react';

import './style.css';
import twitterLogo from '../../assets/images/twitter.png';
import githubLogo from '../../assets/images/github.svg';
import starIcon from '../../assets/images/star.png';

import {UserProps, ReposProps} from '../../App';

interface ProfileProps {
    informations: UserProps,
    repositories: Array<ReposProps>
}

const Profile: React.FC<ProfileProps> = (props) => {
    return(      
        <div id="profile">
            <div className="header">
                <div className="avatar">
                    <div className="avatar-img">
                        <img src={props.informations.avatar_url} alt="Avatar"/>
                    </div>

                    <div className="data">
                        <h1>Seguidores:</h1>
                        <div className="number n1">{props.informations.followers} </div>
                    </div>

                    <div className="data">
                        <h1>Seguindo:</h1>
                        <div className="number n2">{props.informations.following}</div>
                    </div>
                </div>

                <div className="texts">
                    <h2>{props.informations.name} <span>({props.informations.login})</span></h2>
                    <p>{props.informations.bio}</p>

                    <div className="repositories">
                        <div className="title">
                            <h4>Repositórios: <span>({props.informations.public_repos})</span></h4>
                        </div>

                        <div className="repos">
                            {props.repositories.length ? (
                                props.repositories.map(repo => {
                                    return(
                                        <div key={repo.name} className="each-repo">
                                            <a target="_blank" href={repo.html_url}>{repo.name}</a>
                                            <span> <img src={starIcon} alt="Estrela"/> {repo.stargazers_count} </span>
                                        </div>
                                    );
                                })
                            ) : (
                                null
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bottom">
                <div className="networks">
                    <a target="_blank" href={props.informations.html_url}><img src={githubLogo} alt=""/></a>
                    <a target="_blank" href={`https://twitter.com/${props.informations.twitter_username}`}><img src={twitterLogo} alt=""/></a>
                </div>

                <button type="button"> <a target="_blank" href={props.informations.html_url}>Visitar Perfil </a> </button>
            </div>
        </div>
    );
}

export default Profile;