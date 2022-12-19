using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Comments.Core.Exceptions;
using Comments.Core.Model;
using Comments.Core.Service;

namespace Comments.Core
{
    public class ApplicationManagerComments
    {
        StorageServiceComments _storageServiceComments;
        public ApplicationManagerComments(StorageServiceComments storageServiceComments)
        {
            _storageServiceComments = storageServiceComments;
        }
        public List<Comment> GetAllComments() => _storageServiceComments.GetComment();
        public bool IsCommentsListEmpty() => GetAllComments().Count == 0;
        public Comment GetComment(int id) => _storageServiceComments.GetComment(id);
        public Comment CreateComment(int user_id, int movie_id, string comment)
        {
            //eccezione notnull sui campi user e movie id superflua poiche' non viene accettato un campo vuoto sulla post
            if(comment.Length > 160) throw new WrongLengthComment(comment);
            return _storageServiceComments.CreateComment(user_id, movie_id, comment);   
        }
        public Comment ModifyComment(int id, string updatedComment)
        {
            if (updatedComment.Length > 160) throw new WrongLengthComment(updatedComment);
            return _storageServiceComments.ModifyComment(id, updatedComment);
        }
        public bool DeleteComment(int id) => _storageServiceComments.DeleteComment(id);
    }
}
