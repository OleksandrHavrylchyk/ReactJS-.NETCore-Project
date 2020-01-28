using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace WebApplication
{
    public class ModelContext : DbContext
    {
        public ModelContext(DbContextOptions<ModelContext> options) : base(options)
        {
        }

        public DbSet<Model> Model{ get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite("Data Source=database.db");
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Model>().HasData(new Model { Id = 1, Title = "Title 1", Content = "Content 1" });
        }
}
    public class Model
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }

    }
}
