using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.Models
{
    public class IndexViewModel
    {
        public IEnumerable<Products> Products { get; set; }
        public PageViewModel PageViewModel { get; set; }
    }
}
