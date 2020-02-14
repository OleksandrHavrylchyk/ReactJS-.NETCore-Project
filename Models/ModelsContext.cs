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
            modelBuilder.Entity<Products>().HasData(new Products { ID = 1, ProductName = "BMW", Description = "Bayerische Motoren Werke", CategoryID = 1, Price = 30000.00f });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 2, ProductName = "Xiaomi", Description = "Redmi note 8", CategoryID = 2, Price = 5000.00f });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 3, ProductName = "Lenovo", Description = "Laptop for learn", CategoryID = 3, Price = 15000.00f });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 4, ProductName = "Samsung", Description = "To watch", CategoryID = 4, Price = 10000.00f });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 5, ProductName = "HyperX", Description = "Titan pc", CategoryID = 5, Price = 30000.00f });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 6, ProductName = "Mercedes", Description = "Benz", CategoryID = 1, Price = 45000.00f });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 7, ProductName = "Iphone", Description = "11", CategoryID = 2, Price = 30000.00f });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 8, ProductName = "MacBook", Description = "For what?", CategoryID = 3, Price = 30000.00f });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 9, ProductName = "Panasonic", Description = "Full HD 4k", CategoryID = 4, Price = 15000.00f });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 10, ProductName = "Titan Z", Description = "For games", CategoryID = 5, Price = 45000.00f });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 11, ProductName = "Mini Cooper", Description = "Cool car", CategoryID = 1, Price = 50000.00f });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 12, ProductName = "One Plus", Description = "+", CategoryID = 2, Price = 15000.00f });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 13, ProductName = "Acer", Description = "Take", CategoryID = 3, Price = 5000.00f });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 14, ProductName = "Akai", Description = "China", CategoryID = 4, Price = 5000.50f });
            modelBuilder.Entity<Products>().HasData(new Products { ID = 15, ProductName = "NvidiaPC", Description = "Nice PC", CategoryID = 5, Price = 30000.50f });
        }
    }
}
