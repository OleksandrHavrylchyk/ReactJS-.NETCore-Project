using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication
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
            modelBuilder.Entity<Products>().HasData(new Products { ID = 1, ProductName = "Title 1", Description = "Content 1" , CategoryID = 1 });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 2, ProductName = "Title 2", Description = "Content 2" , CategoryID = 2 });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 3, ProductName = "Title 3", Description = "Content 3" , CategoryID = 3 });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 4, ProductName = "Title 4", Description = "Content 4" , CategoryID = 4 });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 5, ProductName = "Title 5", Description = "Content 5" , CategoryID = 5 });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 6, ProductName = "Title 6", Description = "Content 6" , CategoryID = 1 });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 7, ProductName = "Title 7", Description = "Content 7" , CategoryID = 2 });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 8, ProductName = "Title 8", Description = "Content 8" , CategoryID = 3 });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 9, ProductName = "Title 9", Description = "Content 9" , CategoryID = 5 });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 10, ProductName = "Title 10", Description = "Content 10", CategoryID = 4 });
        }
    }
    public class Products
    {
        public int ID { get; set; }
        [StringLength(50)]  
        public string ProductName { get; set; }
        [StringLength(100)]
        public string Description { get; set; }
        public int CategoryID { get; set; }
        [ForeignKey("CategoryID")]
        public Categories Category { get; set; }

    }

    public class Categories
    {
        public int ID { get; set; }
        [StringLength(30)]
        public string CategoryName { get; set; }
    }
}
