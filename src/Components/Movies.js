import React, { Component } from 'react'
import css from "./Movies.module.css";
import axios from "axios";

export default class Movies extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movieArray1:[]
        }
    }
    componentDidMount(){
        axios.get("https://www.omdbapi.com/?apikey=45f0782a&s=war")
        .then(response=>{
            this.setState({movieArray1:response.data})

        })
        .catch(err=>{
            console.log(err.message)
        })
    }
    handleChange=(e)=>{
        console.log(e.target.value) 
        let title = e.target.value;
        axios.get(`https://www.omdbapi.com/?apikey=45f0782a&s=${title===""?"war":title}`)
        .then(response=>{
            this.setState({movieArray1:response.data})
        })
        .catch(err=>{
            console.log(err.message)
        })    
    }
    render() {
        console.log(this.state.movieArray1)
        let {Search} = this.state.movieArray1;//destructuring
        console.log(Search)
        return (
            <div>
                <div id="input-wrapper">
                    <h1>Movie Search Website </h1>
                    <input onChange={this.handleChange} type="text" placeholder="Search for Movie Title" id={css.input}/>
                </div>
                <div id={css.container}>
                {Search !== undefined ? Search.map((item,pos)=>{
                    return <article key={`${item.imdbID}${pos}`} className={css.card}>
                                <img src={item.Poster} alt="movieImage"/>
                                <p>{item.Title}</p>
                            </article>
                }): <h3>Movie Not Found...<br/>Enter a Valid Name..!</h3> }
                </div>
                <footer>
                    Copyright @2021<br/>Creator - Junnatul Nayem<br/>Connect Me<br/>
                    <a href="http://www.linkedin.com/in/junnatul-nayem-a94a03193"><i className="fab fa-linkedin-in"></i></a>
                    <a href="https://codepen.io/junnatul99"><i className="fab fa-codepen"></i></a>
                    <a href="https://github.com/junnatul"><i className="fab fa-github"></i></a>
                </footer>
            </div>
        )
    }
}
