using Microsoft.EntityFrameworkCore.Migrations;

namespace Brum.API.Migrations
{
    public partial class IsApproved : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "Photos",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDrivingLicence",
                table: "Photos",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "IsDrivingLicence",
                table: "Photos");
        }
    }
}
