using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Comments.DB.Model
{
    [Table("comments")]
    public class CommentsEntity
    {
        [Column("id"), Key]
        public int Id { get; set; }

        [Column("user_id")]
        public int User_Id { get; set; }

        [Column("movie_id")]
        public int Movie_Id { get; set; }

        [Column("comment"), StringLength(200), DataType(DataType.Text)]
        public string Comment { get; set; }
    }
}

