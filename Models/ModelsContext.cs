﻿using Microsoft.EntityFrameworkCore;

namespace WebApplication.Models
{
    public class ModelContext : DbContext
    {
        public ModelContext(DbContextOptions<ModelContext> options) : base(options)
        {
        }

        public DbSet<Products> Product{ get; set; }
        public DbSet<Categories> Category { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite("Data Source=database.db");
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Categories>().HasData(new Categories { ID = 1, CategoryName = "Category 1" });
            modelBuilder.Entity<Categories>().HasData(new Categories { ID = 2, CategoryName = "Category 2" });
            modelBuilder.Entity<Categories>().HasData(new Categories { ID = 3, CategoryName = "Category 3" });
            modelBuilder.Entity<Categories>().HasData(new Categories { ID = 4, CategoryName = "Category 4" });
            modelBuilder.Entity<Categories>().HasData(new Categories { ID = 5, CategoryName = "Category 5" });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 1, ProductName = "Title 1", Description = "Content 1", CategoryID = 1 });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 2, ProductName = "Title 2", Description = "Content 2", CategoryID = 2 });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 3, ProductName = "Title 3", Description = "Content 3", CategoryID = 3 });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 4, ProductName = "Title 4", Description = "Content 4", CategoryID = 4 });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 5, ProductName = "Title 5", Description = "Content 5", CategoryID = 5 });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 6, ProductName = "Title 6", Description = "Content 6", CategoryID = 1 });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 7, ProductName = "Title 7", Description = "Content 7", CategoryID = 2 });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 8, ProductName = "Title 8", Description = "Content 8", CategoryID = 3 });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 9, ProductName = "Title 9", Description = "Content 9", CategoryID = 4 });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 10, ProductName = "Title 10", Description = "Content 10", CategoryID = 5 });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 11, ProductName = "Title 11", Description = "Content 11", CategoryID = 1 });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 12, ProductName = "Title 12", Description = "Content 12", CategoryID = 2 });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 13, ProductName = "Title 13", Description = "Content 13", CategoryID = 3 });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 14, ProductName = "Title 14", Description = "Content 14", CategoryID = 4 });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 15, ProductName = "Title 15", Description = "Content 15", CategoryID = 5 });
        }
    }
}
