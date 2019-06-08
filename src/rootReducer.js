import { combineReducers }     from 'redux';
import AdminLoginReducer       from './components/AdminLogin/AdminLoginReducer';
import ConfimOrCancelReducer   from './components/ConfirmOrCancel/ConfirmOrCancelReducer';
import ForumMainReducer        from './components/ForumMain/ForumMainReducer'
import OrganizersReducer       from './components/Organizers/OrganizersReducer';
import LeaderboardReducer      from './components/Leaderboard/LeaderboardReducer';
import TalksPageReducer        from './components/TalksPage/TalksPageReducer';
import MeetupsReducer          from './components/Meetups/MeetupsReducer';
import NewslettersReducer      from './components/Newsletters/NewslettersReducer';
import PlayerProfileReducer    from './components/PlayerProfile/PlayerProfileReducer';
import ForumTopicsReducer      from './components/ForumTopics/ForumTopicsReducer';
import PaginationReducer       from './components/Pagination/PaginationReducer';

const rootReducer = combineReducers({
    AdminLogin       : AdminLoginReducer,
    ConfirmOrCancel  : ConfimOrCancelReducer,
    ForumMain        : ForumMainReducer,
    ForumTopics      : ForumTopicsReducer,
    Organizers       : OrganizersReducer,
    Leaderboard      : LeaderboardReducer,
    TalksPage        : TalksPageReducer, 
    MeetupsReducer   : MeetupsReducer,
    Newsletters      : NewslettersReducer,
    PlayerProfile    : PlayerProfileReducer,
    Pagination       : PaginationReducer
});

export default rootReducer; 
