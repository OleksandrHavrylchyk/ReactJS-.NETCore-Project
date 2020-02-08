using Microsoft.EntityFrameworkCore;

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
            modelBuilder.Entity<Categories>().HasData(new Categories { ID = 1, CategoryName = "Car" });
            modelBuilder.Entity<Categories>().HasData(new Categories { ID = 2, CategoryName = "Smartphone" });
            modelBuilder.Entity<Categories>().HasData(new Categories { ID = 3, CategoryName = "Laptop" });
            modelBuilder.Entity<Categories>().HasData(new Categories { ID = 4, CategoryName = "TV" });
            modelBuilder.Entity<Categories>().HasData(new Categories { ID = 5, CategoryName = "PC" });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 1, ProductName = "BMW", Description = "Bayerische Motoren Werke", CategoryID = 1, Price = 5000f });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 2, ProductName = "Title 2", Description = "Content 2", CategoryID = 2, Price = 5.50f });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 3, ProductName = "Title 3", Description = "Content 3", CategoryID = 3, Price = 20.50f });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 4, ProductName = "Title 4", Description = "Content 4", CategoryID = 4, Price = 15.50f });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 5, ProductName = "Title 5", Description = "Content 5", CategoryID = 5, Price = 13.25f });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 6, ProductName = "Title 6", Description = "Content 6", CategoryID = 1, Price = 5.50f });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 7, ProductName = "Title 7", Description = "Content 7", CategoryID = 2, Price = 9.85f });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 8, ProductName = "Title 8", Description = "Content 8", CategoryID = 3, Price = 6.10f });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 9, ProductName = "Title 9", Description = "Content 9", CategoryID = 4, Price = 7.30f });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 10, ProductName = "Title 10", Description = "Content 10", CategoryID = 5, Price = 25.00f });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 11, ProductName = "Title 11", Description = "Content 11", CategoryID = 1, Price = 85.00f });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 12, ProductName = "Title 12", Description = "Content 12", CategoryID = 2, Price = 100.00f });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 13, ProductName = "Title 13", Description = "Content 13", CategoryID = 3, Price = 60.00f });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 14, ProductName = "Title 14", Description = "Content 14", CategoryID = 4, Price = 50.00f });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 15, ProductName = "Title 15", Description = "Content 15", CategoryID = 5, Price = 30.00f });
        }
    }
}
