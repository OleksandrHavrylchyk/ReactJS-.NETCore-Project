using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication.Models
{
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
}
