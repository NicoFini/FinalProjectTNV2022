using System;
using System.ComponentModel.DataAnnotations.Schema;
using Comments.Core.Model;
using Comments.DB.Model;

namespace Comments.DB.Mapper
{
    public class CommentsEntityMapper
    {
        public static Comment From(CommentsEntity entity)
        {
            return new Comment(entity.Id, entity.User_Id, entity.Movie_Id, entity.Comment);
        }
    }
}

