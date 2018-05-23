/**
 * Created by InnF on 2018/5/2.
 */

import React from 'react';
import {
    Row,
    Col,
    Pagination
} from 'antd';

import MovieCard from '../movieCard/MovieCard'
import './MovieList.css'
import Api from '../Api'

function ACol(props) {
    return (
        <div>
            <Col span={1}/>
            <Col span={4}>
                <MovieCard key={props.movie.title} {...props.movie}/>
            </Col>
        </div>
    )
}

function Rows(props) {
    let cols = [];
    const rows = [];
    for (let i = 0; i < props.movies.length; i++) {
        if (i % 4 === 0) {
            cols.push(<Col span={3}/>);
            rows.push(<Row key={i}>{cols.map(c => c)}</Row>);
            cols = [];
            cols.push(<Col span={2}/>);
        }
        cols.push(<ACol movie={props.movies[i]}/>);
    }
    rows.push(cols.map(c => c));
    return <div>{rows.map(r => <div><br/>{r}</div>)}</div>;
}

class MovieList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: false,
            page: 1
        }
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch(Api.movieList(this.state.page - 1), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/js on',
            },
            mode: 'cors',
        })
            .then(response => response.json())
            .then(info => this.setState({data: info.data, isLoading: false}))
            .catch(error => console.error('Error:', error));
    }


    onPageChange(pageNumber) {
        this.setState({page: pageNumber});
        console.log('Page: ', pageNumber);
    }

    render() {

        let {data} = this.state;

        if (data[0] == null) {
            return <div></div>;
        }

        return (
            <div>
                <Row>
                    <Rows key="movie-list" movies={data}/>
                </Row>
                <br/>
                <br/>
                <br/>
                <Row>
                    <Col span={24} id="pagination">
                        <Pagination defaultCurrent={this.state.page} total={12} pageSize={12}
                                    onChange={this.onPageChange.bind(this)}/>
                    </Col>
                </Row>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }
}

export default MovieList;

/*
 <Col span={4}>
 <MovieCard {...data[0]}/>
 </Col>
 <Col span={1}/>
 <Col span={4}>
 <MovieCard {...data[1]}/>
 </Col>
 <Col span={1}/>
 <Col span={4}>
 <MovieCard {...data[2]}/>
 </Col>
 <Col span={1}/>
 <Col span={4}>
 <MovieCard {...data[0]}/>
 </Col>
 */