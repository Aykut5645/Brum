using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Brum.API.Migrations
{
    public partial class RideEntityAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Rides",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DriverId = table.Column<int>(nullable: false),
                    TotalSeats = table.Column<int>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    StartPoint = table.Column<string>(nullable: true),
                    EndPoint = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rides", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rides_AspNetUsers_DriverId",
                        column: x => x.DriverId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRides",
                columns: table => new
                {
                    PassengerId = table.Column<int>(nullable: false),
                    RideId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRides", x => new { x.PassengerId, x.RideId });
                    table.ForeignKey(
                        name: "FK_UserRides_AspNetUsers_PassengerId",
                        column: x => x.PassengerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserRides_Rides_RideId",
                        column: x => x.RideId,
                        principalTable: "Rides",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rides_DriverId",
                table: "Rides",
                column: "DriverId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRides_RideId",
                table: "UserRides",
                column: "RideId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserRides");

            migrationBuilder.DropTable(
                name: "Rides");
        }
    }
}
