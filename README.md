# Complaint Widget

A customizable JavaScript widget that allows users to submit complaints through a form with a responsive modal design. It includes support for file attachments and integrates with any API endpoint.

## Features

- Easy integration with any webpage.
- Responsive design.
- Customizable icon and modal content.
- Supports file attachments.
- Displays success or error messages within the modal.

## Demo

![Widget Demo](demo.gif) <!-- Replace with an actual demo link or GIF -->

## Installation

1. Clone the repository or download the `ComplaintWidget` script.
   ```bash
   git clone https://github.com/DawAlfada/CDN-ComplaintWidget
   ```

2. Include the script in your project:
   ```html
   <script src="ComplaintWidget.js"></script>
   ```

3. Add the required fonts for better styling:
   ```html
   <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap">
   ```

4. Add the widget to your page using the initialization code.

## Usage

```javascript
// Initialize the ComplaintWidget
const complaintWidget = new ComplaintWidget({
  apiUrl: 'https://example.com/api/complaints', // Replace with your API endpoint
  iconUrl: 'icon.png',                         // Optional: Path to your custom icon
  targetElement: 'body'                        // Optional: Element to append the widget
});

complaintWidget.init();
```

### API Integration

- **Endpoint**: The `apiUrl` should point to the endpoint where the form data will be sent.
- **Method**: The widget uses the `POST` method to send form data.
- **Payload**: The form sends the following fields:
  - `title` (string): The complaint title.
  - `description` (string): The complaint description.
  - `fullName` (string): The user's full name.
  - `attachment` (file): An optional file attachment.

### Styling

The widget uses default styles but can be customized by modifying the `ComplaintWidget` script or overriding the styles in your CSS.

## File Structure

```
ComplaintWidget/
├── ComplaintWidget.js    # Main widget script
├── demo.html             # Demo page
├── icon.png              # Default widget icon
├── logo.png              # Modal logo
└── README.md             # Documentation
```

## Contributing

Contributions are welcome! If you have suggestions or encounter issues, feel free to open an [issue](https://github.com/DawAlfada/CDN-ComplaintWidget/issues) or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

### Author

Developed by [Ammar Security](https://github.com/ammarsecurity).

For questions or support, feel free to reach out!
