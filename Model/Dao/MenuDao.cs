using Model.EF;
using System.Collections.Generic;
using System.Linq;

namespace Model.Dao
{
    public class MenuDao
    {
        private OnlineShopDbContext db = null;

        public MenuDao()
        {
            db = new OnlineShopDbContext();
        }

        public List<Menu> ListByGroupId(int groupId)
        {
            return db.Menus.Where(x => x.TypeID == groupId && x.Status == true).OrderBy(x => x.DisplayOrder).ToList();
        }
    }
}