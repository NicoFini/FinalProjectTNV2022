using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Comments.Core.Model
{
    public class Comment
    {
        public int _id;
        public int _user_id;
        public int _movie_id;
        public string _comment;

    public Comment(int id, int user_id, int movie_id, string comment)
        {
            _id = id;
            _user_id = user_id;
            _movie_id = movie_id;
            _comment = comment;
        }

    }
}
