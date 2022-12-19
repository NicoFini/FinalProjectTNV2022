using System;
using System.Linq;
using Comments.Core.Exceptions;
using Comments.Core.Model;
using Comments.Core.Service;
using Comments.DB.Model;
using Comments.DB.Mapper;
using Comments.DB;

namespace Comments.DB
{
    public class MySqlStorageService : StorageServiceComments
    { 
        private ApplicationContext _context;

        public MySqlStorageService()
        {
            _context = new();
            _context.Database.EnsureCreated();
        }

        public bool DeleteComment(int id)
        {
            var commentToDelete = GetCommentOrFail(id);

            _context.Comments.Remove(commentToDelete);
            _context.SaveChanges();

            return true;
        }

        public Comment CreateComment(int user_id, int movie_id, string comment)
        {
            var createComment = new CommentsEntity
            {
               
                User_Id = user_id,
                Movie_Id = movie_id,
                Comment = comment,
            };

            _context.Comments.Add(createComment);
            _context.SaveChanges();

            return CommentsEntityMapper.From(createComment);
        }

        public List<Comment> GetComment() =>
            _context.Comments.Select(CommentsEntry => CommentsEntityMapper.From(CommentsEntry)).ToList();

        public Comment GetComment(int id)
        {
            var c = GetCommentOrFail(id);
            return CommentsEntityMapper.From(c);
        }

        public Comment ModifyComment(int id, int user_id, int movie_id, string updatedComment)
        {
            var ModifiedComment = GetCommentOrFail(id);
            ModifiedComment.Id = id;
            ModifiedComment.User_Id = user_id;
            ModifiedComment.Movie_Id = movie_id;
            ModifiedComment.Comment = updatedComment;

            _context.SaveChanges();
            return CommentsEntityMapper.From(ModifiedComment);
        }


        private CommentsEntity GetCommentOrFail(int id)
        {
            var c = _context.Comments.Find(id);

            if (c == null) throw new CommentNotFound(id);
            return c;
        }

        
    }
}
