import React,{useEffect} from 'react'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios'
import { reducerCases } from '../utils/Constants';
import styled from 'styled-components'

export default function Playlists() {
  const [{token, playlists},dispatch] = useStateProvider();
  useEffect(() => {
    const getPlaylistData = async() => {
        const response = await axios.get(
            'https://api.spotify.com/v1/me/playlists',
        {
            headers: {
                Authorization:"Bearer " + token,
                "Content-Type": "application/json",  
            },
        }
     );
     const {items} = response.data;
     const playlists = items.map(({name,id}) =>{
        return {name,id}; 
     });
     dispatch({type : reducerCases.SET_PLAYLISTS, playlists})
   };
    getPlaylistData();
  },[token,dispatch])

  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
  };

    return ( 
    <Container>
      <ul>
            {playlists.map(({name,id}) => {
                return <li key={id} onClick={() => changeCurrentPlaylist(id)}>{name}</li>;
              })}
              
        </ul>  
    </Container>
    );
}
 
const Container = styled.div`
ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    li {
      display: flex;
      gap: 1rem;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      &:hover {
        color: aliceblue;
      }
    }
  }
`