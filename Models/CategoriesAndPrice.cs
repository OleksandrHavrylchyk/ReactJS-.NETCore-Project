using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.Models
{
    public class CategoriesAndPrice
    {
        public IQueryable<Categories> Categories { get; set; }
        public Dictionary<string, float> Prices { get; set; }
    }
}
