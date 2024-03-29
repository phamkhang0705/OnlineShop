﻿using Model.EF;
using System.Collections.Generic;
using System.Linq;

namespace Model.Dao
{
    public class CategoryDao
    {
        private OnlineShopDbContext db = null;

        public CategoryDao()
        {
            db = new OnlineShopDbContext();
        }

        public long Insert(Category category)
        {
            db.Categories.Add(category);
            db.SaveChanges();
            return category.ID;
        }

        public List<Category> ListAll()
        {
            return db.Categories.Where(x => x.Status == true).ToList();
        }

        public ProductCategory ViewDetail(long id)
        {
            return db.ProductCategories.Find(id);
        }
    }
}