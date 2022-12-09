using Microsoft.EntityFrameworkCore.Migrations;

namespace Brum.API.Migrations
{
    public partial class AddPassengerStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "UserRides",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "UserRides");
        }
    }
}
