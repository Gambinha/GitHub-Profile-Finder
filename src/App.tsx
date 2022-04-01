import React, { useState, useEffect } from 'react';
import api from './services/api';

import './assets/styles/app.css';
import SearchIcon from './assets/images/search-user.svg';
import LupaIcon from './assets/images/lupa.svg';

import Header from './components/Header';
import Profile from './components/Profile';
import NotFound from './components/NotFound';
import Loading from './components/Loading';

export interface UserProps {
  name: string | null,
  login: string,
  bio: string | null,
  avatar_url: string,
  followers: number,
  following: number,
  html_url: string,
  twitter_username: string | null,
  public_repos: number,
}

export interface ReposProps {
  name: string;
  html_url: string;
  stargazers_count: number;
}

function App() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [informations, setInformations] = useState<UserProps>();
  const [repos, setRepos] = useState<Array<ReposProps>>([]);

  useEffect( () => {
    const initialState: UserProps = {
      name: '',
      login: '',
      bio: '',
      avatar_url: '',
      followers: 0,
      following: 0,
      html_url: '',
      twitter_username: '',
      public_repos: 0,
    };

    const headers ={
      "Authorization": `Token ${process.env.REACT_APP_TOKEN}`
    };

    async function saveInformations() {  
      console.log("carregando...");
      setLoading(true);

      const profile = await api.get(`/users/${input}`, {
        "headers": headers
      })

      return profile;
    }

    async function saveRepositories() {
      const repos = await api.get(`/users/${input}/repos?per_page=4&sort="created:%20asc"`, {
        "headers": headers
      });

      return repos;
    }

    function addRepositories(repositories: Array<ReposProps>) {
      const reposArray = repositories.map(repo => {
        return { 
            name: repo.name,
            html_url: repo.html_url, 
            stargazers_count: repo.stargazers_count,
        }
      });

      return reposArray;
    }

    if(input) {
      saveInformations()
        .then( response => {
          setInformations(response.data);
          setLoading(false);
          setError(false);
        })
        .catch( error => {
          setInformations(initialState);
          setLoading(false);
          setError(true);
          console.error(error);
        })

      saveRepositories()
        .then( response => {
          const newArray = addRepositories(response.data);
          setRepos(newArray);
          setError(false);
        })
        .catch (error => {
          setError(true);
          console.error(error);
        })

    }
    else {
      setInformations(initialState);
      setError(false);
      setLoading(false);
    }
  }, [input]);

  return (
    <div id="container">
      <Header></Header>

      <main>
        <div className="wrapper">
          <div className="content">
            <div className="search">
              <label htmlFor="user">Informe o usuário:</label>
              <input 
                type="text" 
                name="user"
                id="search-bar"
                autoComplete="off"
                onChange={(e) => setInput(e.target.value)}
              />
              <img src={LupaIcon} alt=""/>
            </div>

            <div className="box">

                {informations?.login && (
                  <Profile 
                    informations={informations}
                    repositories={repos}
                  />
                )
                }

                {error && (
                  <NotFound />
                )
                }

                {loading && !error && !informations?.login && (
                  <Loading />
                )
                }

            </div>
          </div>

          <div className="image">
            <img src={SearchIcon} alt="Imagem"/>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
