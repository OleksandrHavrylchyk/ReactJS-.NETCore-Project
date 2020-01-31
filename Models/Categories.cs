using System.ComponentModel.DataAnnotations;

namespace WebApplication.Models
{
    public class Categories
    {
        public int ID { get; set; }
        [StringLength(30)]
        public string CategoryName { get; set; }
    }
}
