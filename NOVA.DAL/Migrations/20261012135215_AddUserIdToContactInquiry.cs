using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NOVA.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddUserIdToContactInquiry : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Phone",
                table: "Users",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Users",
                type: "nvarchar(300)",
                maxLength: 300,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "ContactInquiries",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ContactInquiries_UserId",
                table: "ContactInquiries",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ContactInquiries_Users_UserId",
                table: "ContactInquiries",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ContactInquiries_Users_UserId",
                table: "ContactInquiries");

            migrationBuilder.DropIndex(
                name: "IX_ContactInquiries_UserId",
                table: "ContactInquiries");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "ContactInquiries");

            migrationBuilder.AlterColumn<string>(
                name: "Phone",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(300)",
                oldMaxLength: 300);
        }
    }
}
