import { connect } from 'react-redux';
import ForumTopics from './ForumTopics';
function mapStoreToProps(store){
    return {
       viewingThread   : store.ForumTopics.viewingThread,
       newTopicActive  : store.ForumMain  .newTopicActive,
       blogs           : store.ForumTopics.blogs,
       threads         : store.ForumTopics.threads,
       blogId          : store.ForumTopics.blogId,
       number          : store.ForumTopics.number,
       signedIn        : store.ForumMain  .signedIn,
       comment         : store.ForumTopics.comment,
       count           : store.ForumTopics.count,
       sortOrder       : store.Leaderboard.sortOrder,
       viewingThreadId : store.ForumTopics.viewingThreadId,
       editingComment  : store.ForumTopics.editingComment,
       editingCommentId: store.ForumTopics.editingCommentId,
       editingBlog     : store.ForumTopics.editingBlogId,
       editingBlogId   : store.ForumTopics.editingBlogId,
       newBlogTitle    : store.ForumTopics.newBlogTitle,
       newBlogBody     : store.ForumTopics.newBlogBody,
       totalCount      : store.ForumTopics.totalCount
    };
}

export default connect(mapStoreToProps)(ForumTopics);
