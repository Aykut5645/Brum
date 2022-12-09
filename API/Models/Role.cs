using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Brum.API.Models
{
    public class Role: IdentityRole<int>
    {
        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}