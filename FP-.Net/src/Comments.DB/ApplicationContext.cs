using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Comments.DB.Model;

namespace Comments.DB
{
    public class ApplicationContext : DbContext
    {
        public DbSet<CommentsEntity>? Comments { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var version = new MySqlServerVersion(new Version(8, 0, 30));
            var connectionString = "Server=localhost;Port=3306;Database=db_gtm;Uid=root;Pwd=MySQL6610639!";

            optionsBuilder.UseMySql(connectionString, version);
            base.OnConfiguring(optionsBuilder);
        }
    }
}
