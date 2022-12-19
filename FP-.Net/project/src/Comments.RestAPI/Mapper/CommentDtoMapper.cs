using System;
using Comments.Core.Exceptions;
using Comments.Core.Model;
using Comments.RestAPI.Model;

namespace Comments.RestAPI.Mapper
{
    public class CommentDtoMapper
    {
        public static CommentDto From(Comment s) => new CommentDto
        {
            Id = s._id,
            User = s._user_id,
            MovieId = s._movie_id,
            Comment = s._comment,

        };
    }
}