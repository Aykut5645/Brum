using Brum.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Brum.API.Data
{
    public class DataContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options){}
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Ride> Rides { get; set; }
        public DbSet<UserRide> UserRides { get; set; }

         protected override void OnModelCreating(ModelBuilder builder)
         {
             base.OnModelCreating(builder);
             builder.Entity<UserRole>(userRole => {
                 userRole.HasKey(ur => new {ur.UserId, ur.RoleId});

                 userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();
                
                     userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
             });

            //Likes
            builder.Entity<Like>()
                .HasKey(k => new {k.LikerId, k.LikeeId});

            builder.Entity<Like>()
                .HasOne(u => u.Likee)
                .WithMany(u => u.Likers)
                .HasForeignKey(u => u.LikeeId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Like>()
                .HasOne(u => u.Liker)
                .WithMany(u => u.Likees)
                .HasForeignKey(u => u.LikerId)
                .OnDelete(DeleteBehavior.Restrict);

            //Messages
            builder.Entity<Message>()
                .HasOne(u => u.Sender)
                .WithMany(m => m.MessegesSent)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>()
                .HasOne(u => u.Recipient)
                .WithMany(m => m.MessegesReceived)
                .OnDelete(DeleteBehavior.Restrict);

            // Photos
            builder.Entity<Photo>().HasQueryFilter(p => p.IsApproved);

            // Rides
            builder.Entity<UserRide>()
                .HasKey(k => new {
                    k.PassengerId,
                    k.RideId
                });
            builder.Entity<UserRide>()
                .HasOne(u => u.Passenger)
                .WithMany(u => u.RidesAsPassenger)
                .HasForeignKey(u => u.PassengerId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<UserRide>()
                .HasOne(u => u.Ride)
                .WithMany(u => u.Passengers)
                .HasForeignKey(u => u.RideId)
                .OnDelete(DeleteBehavior.Restrict);

         }
        
    }
}