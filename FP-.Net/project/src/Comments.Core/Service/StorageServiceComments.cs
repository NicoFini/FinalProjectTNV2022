using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Comments.Core.Model;

namespace Comments.Core.Service
{
public interface StorageServiceComments
    {
        Comment CreateComment(int user_id, int movie_id, string comment);

        List<Comment> GetComment();

        Comment GetComment(int id);

        Comment ModifyComment(int id, int user_id, int movie_id, string comment);

        bool DeleteComment(int id);
    }
}

