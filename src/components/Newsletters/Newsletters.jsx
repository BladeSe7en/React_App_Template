import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Navbar from '../Navbar/Navbar';
import glicko2 from 'glicko2';
import moment from 'moment';
import openSocket from 'socket.io-client';
import { getNewsletters, isLoading, getFirst, getLast, test, updatePageInView } from './NewslettersActions';
import $ from "jquery";
import NewsletterNav from '../NewsletterNav/NewsletterNav';
import { Waypoint } from 'react-waypoint';

class Newsletters extends Component {
  constructor(props) {
    super(props);
    this.socket   = this.socket  .bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.listener = this.listener.bind(this);
    this.handleUpdateCurrentPageNews = this.handleUpdateCurrentPageNews.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.listener()
    dispatch(getFirst())
    setTimeout(() => {
      dispatch(getLast())
    }, 1000);
    dispatch(getNewsletters(10, 0));
    this.socket()
  }

  listener() {
      console.log('this.refs: ',this.refs)
      
      this.refs.myscroll.addEventListener("scroll", () => {
       if (
         this.refs.myscroll.scrollTop + this.refs.myscroll.clientHeight >=
         this.refs.myscroll.scrollHeight
       ) {
       
         this.loadMore()
       }
     });

  }

  loadMore() {
    const { dispatch, scrollingPage, months } = this.props;
    let newPage = scrollingPage + 1
    let lastPage = months && months.length -1
    console.log('last page in load more: ',lastPage)
    console.log('scrollingPage: ',scrollingPage)
    if (lastPage === scrollingPage) return
    else {
      dispatch(isLoading(true, newPage))
      setTimeout(() => {
        let skip = newPage * 10
        dispatch(getNewsletters(10, skip))
      }, 2000);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listener, false);
  }

  socket() {
    var socket = openSocket();
    socket.on('newMessage', function (msg) {
      console.log('msg: ', msg)
      const { dispatch } = this.props;
      dispatch(submitNewsletter(msg))
    });
  }

  handleUpdateCurrentPageNews() {
    const { dispatch } = this.props;
    dispatch(updatePageInView())
  }


  render() {
    const { news, months, currentPageNews, isLoading, dispatch } = this.props;
    let lastPage = months && months.length -1
    console.log('lastPage: ',lastPage)
    let firstEllipsis = currentPageNews > 3 ? 'newsPage' : 'hide';
        let lastEllipsis = currentPageNews < (lastPage - 3) ? 'newsPage' : 'hide'
        let twoLess = (currentPageNews - 2)
        let oneLess = (currentPageNews - 1)
        let oneMore = (currentPageNews + 1)
        let twoMore = (currentPageNews + 2)
        let twoLessBtn = twoLess >= 0 ? 'newsPage' : 'hide';
        let oneLessBtn = oneLess >= 0 ? 'newsPage' : 'hide';
        let oneMoreBtn = oneMore <= (lastPage) ? 'newsPage' : 'hide';
        let twoMoreBtn = twoMore <= (lastPage) ? 'newsPage' : 'hide';
        let hideFirst = currentPageNews <= 2 ? 'hide' : 'newsPage';
        let hideLast = currentPageNews <= (lastPage - 3) ? 'newsPage' : 'hide';
        let displayWhileLoading = isLoading ? 'loading-message': 'hide';

    return (
      <div>
        <Navbar />
        <div className='newsletter-container'>
          <div className='banner-opacity-newsletter'>
            <h1 className='news-title'>Stay up to date with the latest news from Civilization Players League</h1>

            <div className='news-nav' id='news-nav'>
              {/* <NewsletterNav
              /> */}
              <button className={hideFirst} onClick={this.getNewsletters}>{months && months[0]}</button>
              <button className={firstEllipsis} id={currentPageNews - 3} onClick={this.getNewsletters}>...</button>
              <button className={twoLessBtn} id={twoLess} onClick={this.getNewsletters}>{months && months[currentPageNews -2]}</button>
              <button className={oneLessBtn} id={oneLess} onClick={this.getNewsletters}>{months && months[currentPageNews -1]}</button>
              <button className='newsPage currentNews'>{months && months[currentPageNews]}</button>
              <button className={oneMoreBtn} id={oneMore} onClick={this.getNewsletters}>{months && months[currentPageNews +1]}</button>
              <button className={twoMoreBtn} id={twoMore} onClick={this.getNewsletters}>{months && months[currentPageNews +2]}</button>
              <button className={lastEllipsis} id={currentPageNews + 3} onClick={this.getNewsletters}>...</button>
              <button className={hideLast} id={lastPage} onClick={this.getNewsletters}>{months && months[lastPage]}</button>
            </div>

            <div className='news-posts' id='news-posts' ref="myscroll">
              {news && news.map((post, i) => {
                let lines = post.lines
                let month = moment(Number(post.date)).format('MMMM YYYY')
                console.log('month, ', month);
                return (
                  <div className='one-post' id={month}>
                    <Waypoint onEnter={() => dispatch(updatePageInView(month))} />
                    <div className='news-date'>{moment(Number(post.date)).format('lll')}</div>
                    {lines.map(line => {
                      return (<p className='line'>{line}</p>)
                    })}
                  </div>
                )
              })}
              <div className={displayWhileLoading}>
                <h1>Loading...</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Newsletters;
