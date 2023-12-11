import React, { useEffect, useState } from 'react'
import { fetchPokemons } from '../api/FetchApi'
import PokemonCard from './PokemonCard'
import PokemonInfo from './PokemonInfo';
import Loading from './Loading';

import VersionData from './data/version-data.json';
import SelectCompoent from './SelectCompoent';

const Home = () => {
    const [pokemons, setPokemons] = useState([]); // Initialize pokemons as an empty array
    const [search, setSearch] = useState('');
    const [openPokemonInfo, setOpenPokemonInfo] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState({});
    const [loading, setLoading] = useState(false);
    const [generation, setGeneration] = useState('');
    const [gameVersion, setGameVersion] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isGameboyTheme, setIsGameboyTheme] = useState(false);
    const [isHomeTheme, setIsHomeTheme] = useState(false);
    const [theme, setTheme] = useState('');

    const toggleDarkMode = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        setIsHomeTheme(false);
        setIsGameboyTheme(false);
        localStorage.setItem('isDarkMode', JSON.stringify(newTheme));
        localStorage.setItem('isHomeMode', JSON.stringify(false));
        localStorage.setItem('isGBMode', JSON.stringify(false));
    };

    const toggleHomeMode = () => {
        const newTheme = !isHomeTheme;
        setIsHomeTheme(newTheme);
        localStorage.setItem('isHomeMode', JSON.stringify(newTheme));
    };

    const toggleGameboyMode = () => {
        const newTheme = !isGameboyTheme;
        setIsHomeTheme(newTheme);
        localStorage.setItem('isGBMode', JSON.stringify(newTheme));
    };

    const handleTheme = () => {
        const theme = document.getElementById('themeSel').value;
        handleThemeChange(theme);
        // switch (theme) {
        //     case 'dark':
        //         toggleDarkMode();
        //         // setIsDarkMode(true);
        //         // setIsGameboyTheme(false);
        //         // setIsHomeTheme(false);
        //         break;
        //     case 'gameboy':
        //         toggleGameboyMode();
        //         // setIsGameboyTheme(true);
        //         // setIsDarkMode(false);
        //         // setIsHomeTheme(false);
        //         break;
        //     case 'home':
        //         toggleHomeMode();
        //         // setIsHomeTheme(true);
        //         // setIsDarkMode(false);
        //         // setIsGameboyTheme(false);
        //         break;
        //     default:
        //         toggleDarkMode();
        //         break;
        // }
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme !== null) {
            setTheme(savedTheme);
        }
    }, []);

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

useEffect(() => {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark', 'bg-slate-900', 'text-slate-50');
    } else {
        document.documentElement.classList.remove('dark', 'bg-slate-900', 'text-slate-50');
    } 
}, [theme]);

useEffect(() => {
    if (theme === 'gameboy') {
        document.documentElement.classList.add('gb', 'bg-gameboy-bg', 'text-gameboy-bg');
    } else {
        document.documentElement.classList.remove('gb', 'bg-gameboy-bg', 'text-gameboy-bg');
    } 
}, [theme]);

useEffect(() => {
    if (theme === 'home') {
        document.documentElement.classList.add('home', 'bg-gradient-to-r', 'from-home-bg', 'via-home-midbg', 'to-home-endbg',  'text-home-text');
    } else {
        document.documentElement.classList.remove('home', 'bg-gradient-to-r', 'from-home-bg', 'via-home-midbg', 'to-home-endbg', 'text-home-text');
    } 
}, [theme]);

    useEffect(() => {
        fetchPokemons(setPokemons, setLoading, generation);
    }, [generation]);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        switch (storedTheme) {
            case 'dark':
                setIsDarkMode(true);
                setIsGameboyTheme(false);
                setIsHomeTheme(false);
                break;
            case 'gameboy':
                setIsGameboyTheme(true);
                setIsDarkMode(false);
                setIsHomeTheme(false);
                break;
            case 'home':
                setIsHomeTheme(true);
                setIsDarkMode(false);
                setIsGameboyTheme(false);
                break;
            default:
                setIsDarkMode(false);
                setIsGameboyTheme(false);
                setIsHomeTheme(false);
                break;
        }
        // if( {
        //     setIsDarkMode(JSON.parse(localStorage.getItem('isDarkMode')));
        // } else if(localStorage.getItem('isGBMode')) {
        //     setIsGameboyTheme(JSON.parse(localStorage.getItem('isGBMode')));
        // } else if(localStorage.getItem('isHomeMode')) {
        //     setIsHomeTheme(JSON.parse(localStorage.getItem('isHomeMode')));
        // }
        // if (storedTheme) {
        //   setIsDarkMode(JSON.parse(storedTheme));
        // }
      }, []);

    const filter = () => {
        setGeneration('');
        setGameVersion('');
    }

    return !loading ?
        <>
<div
    className={
        `xl:px-24 px-10 mt-8 py-4 sticky top-0 dark:bg-slate-900  ${openPokemonInfo ? 'xl:pl-10 w-[70%] relative left-[30%]' : ''}`
    }>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search"
                    className='outline-none w-full border-2 py-3 px-5 text-lg rounded-full 
                    dark:bg-slate-800 dark:text-slate-50'
                />
                <div className='flex justify-center flex-col md:flex-row md:justify-end gap-3 mt-3'>
                    <SelectCompoent
                        valueFor={"generation"}
                        value={generation}
                        setValue={setGeneration}
                    />
                    <SelectCompoent
                        valueFor={"gameVersion"}
                        value={gameVersion}
                        setValue={setGameVersion}
                    />
                    <select id="themeSel" onChange={handleTheme} className='outline-none border-2 py-1 px-5 text-md rounded-full cursor-pointer dark:bg-slate-800 dark:text-slate-50'>
                        <option value="">Light</option>
                        <option value="dark" selected={theme == "dark"}>Dark</option>
                        <option value="gameboy" selected={theme == "gameboy"}>Gameboy</option>
                        <option value="home" selected={theme == "home"}>Pokemon Home</option>
                    </select>
                </div>
            </div>

            <div
                className={
                    `grid gap-4 sm:grid-cols-2 xl:px-24 px-10 py-4 dark:bg-slate-900 
                        ${openPokemonInfo ? 'lg:grid-cols-3 xl:pl-10 w-[70%] relative left-[30%]' : 'lg:grid-cols-4'}`
                }>
                {search
                    ? pokemons?.results
                        ?.filter((pokemon) => {
                            if (pokemon.name.toLowerCase().includes(search.toLowerCase())) return pokemon;
                        })
                        ?.filter((pokemon) => {
                            if (generation) {
                                const offset = generation.split(',')[0];
                                const limit = generation.split(',')[1];
                                const pokemonId = pokemon.url.split('/')[6];
                                return pokemonId > Number(offset) && pokemonId <= Number(offset) + Number(limit);
                            }
                            return true;
                        })
                        ?.filter((pokemon) => {
                            if (gameVersion) {
                                const pokemonId = pokemon.url.split('/')[6];
                                return VersionData[gameVersion].Pokemon.some((kantoPokemon) => kantoPokemon.url === pokemonId);
                            }
                            return true;
                        })
                        .map((pokemon, index) => (
                            <PokemonCard pokemon={pokemon} setOpenPokemonInfo={setOpenPokemonInfo} setSelectedPokemon={setSelectedPokemon} key={index} />
                        ))
                    : pokemons?.results
                        ?.filter((pokemon) => {
                            if (generation) {
                                const offset = generation.split(',')[0];
                                const limit = generation.split(',')[1];
                                const pokemonId = pokemon.url.split('/')[6];
                                return pokemonId > Number(offset) && pokemonId <= Number(offset) + Number(limit);
                            }
                            return true;
                        })
                        ?.filter((pokemon) => {
                            if (gameVersion) {
                                const pokemonId = pokemon.url.split('/')[6];
                                return VersionData[gameVersion].Pokemon.some((kantoPokemon) => kantoPokemon.url === pokemonId);
                            }
                            return true;
                        })
                        .map((pokemon, index) => (
                            <PokemonCard
                                pokemon={pokemon}
                                setOpenPokemonInfo={setOpenPokemonInfo}
                                setSelectedPokemon={setSelectedPokemon}
                                key={index}
                            />
                        ))}
            </div>

            {openPokemonInfo ? <PokemonInfo selectedPokemon={selectedPokemon} setInfoOpen={setOpenPokemonInfo} /> : <></>}
        </>
        : <Loading />
}

export default Home