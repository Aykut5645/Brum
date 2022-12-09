using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Brum.API.Models
{
    public class User : IdentityUser<int>
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Introduction { get; set; }
        public string Rules { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public virtual ICollection<Photo> Photos { get; set; }
        public virtual ICollection<Like> Likers { get; set; }
         public virtual ICollection<Like> Likees { get; set; }
         public virtual ICollection<Message> MessegesSent { get; set; }
         public virtual ICollection<Message> MessegesReceived { get; set; }
         public virtual ICollection<UserRole> UserRoles { get; set; }
         public virtual ICollection<Ride> RidesAsDriver { get; set; }
         public virtual ICollection<UserRide> RidesAsPassenger { get; set; }
      
    }
}