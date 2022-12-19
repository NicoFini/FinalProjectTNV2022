using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Comments.Core.Model;

namespace Comments.Core.Exceptions
{
    public class CommentNotFound : Exception
    {
        public CommentNotFound(int id) : base($"Commento non trovato: {id}")
        {
        }
    }
}
