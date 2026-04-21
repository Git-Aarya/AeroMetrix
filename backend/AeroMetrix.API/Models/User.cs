// Data model representing an application user with a unique ID, username, and email address.
namespace AeroMetrix.API.Models;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}
