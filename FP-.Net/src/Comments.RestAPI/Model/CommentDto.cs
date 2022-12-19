using System;
using System.ComponentModel;

namespace Comments.RestAPI.Model
{
    public class CommentDto
    {
        [DisplayName("Id")]
        public int Id { get; set; }

        [DisplayName("USER Id")]
        public int User { get; set; }

        [DisplayName("Movie Id")]
        public int MovieId { get; set; }

        [DisplayName("Comment")]
        public string Comment { get; set; }
    }
}