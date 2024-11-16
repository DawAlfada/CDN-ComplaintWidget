class ComplaintWidget {
  constructor(options) {
    this.apiUrl = options.apiUrl;
    this.iconUrl = options.iconUrl == null ? '2.png' : options.iconUrl;
    this.targetElement = options.targetElement || 'body';
    this.addCairoFont(); 
  }

  init() {
  
    this.addIcon();


    this.addModal();
  }

  addCairoFont() {
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap';
    document.head.appendChild(fontLink);

    const style = document.createElement('style');
    style.innerHTML = `
      #complaintModal {
        font-family: 'Cairo', sans-serif;
        margin: 0;
        padding: 0;
        text-align: right;  
      }

      .complaintModal-btn {
        cursor: pointer;
        font-family: 'Cairo', sans-serif;
      }

      .complaintModal-input {
        font-family: 'Cairo', sans-serif;
      }

      /* Loader CSS */
      .loader {
        border: 4px solid #f3f3f3;
        border-top: 4px solid #3498db;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        display: none;
        margin: 10px auto;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      .copywriter-footer {
      text-align: center;
    color: #acacac;
    margin-top: 20px;
      }
    `;
    document.head.appendChild(style);
  }

  addIcon() {
    const icon = document.createElement('img');
    icon.src = this.iconUrl;
    icon.alt = 'Submit a Complaint';
    icon.style.cursor = 'pointer';
    icon.style.position = 'fixed';
    icon.style.bottom = '2%';
    icon.style.right = '2%';
    icon.style.width = '30vw'; 
    icon.style.height = 'auto'; 
    icon.style.maxWidth = '100px';
    icon.style.zIndex = '9999';
    icon.onclick = () => this.openModal();

    document.querySelector(this.targetElement).appendChild(icon);
  }

  addModal() {
    const modalHtml = `
      <div id="complaintModal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:9999; justify-content:center; align-items:center;">
        <div style="background:white; padding:2%; border-radius:10px; width:90%; max-width:400px;">
          <img src="logo.png" alt="Submit a Complaint" style="width:100%; height:auto;"/> 
          <h2 style="text-align:center;">إرسال شكوى</h2>
          <form id="complaintForm">
            <label>العنوان</label>
            <input type="text" name="title" required style="width: 95%; padding: 12px; margin-bottom: 10px; border-radius: 5px; border: 1px solid #bfbfbf;"/>

            <label>الوصف</label>
            <textarea name="description" required style="width: 95%; padding: 12px; margin-bottom: 10px; border-radius: 5px; border: 1px solid #bfbfbf;"></textarea>

            <label>الاسم الكامل</label>
            <input type="text" name="fullName" required style="width: 95%; padding: 12px; margin-bottom: 10px; border-radius: 5px; border: 1px solid #bfbfbf;"/>

            <label>المرفق</label>
            <div style="position:relative; margin-bottom:10px;">
              <input type="file" id="attachmentInput" name="attachment" accept="image/*" style="opacity:0; position:absolute; z-index:-1;" class="complaintModal-input"/>
              <button type="button" class="complaintModal-btn" id="attachmentButton" style="background:#00BCD4; color:white; padding:10px; border:none; border-radius:5px; width:100%;">اختيار ملف</button>
              <span id="attachmentFileName" style="display:block; margin-top:5px; font-size:14px; color:#555;"></span>
            </div>
            <div id="loader" class="loader"></div> <!-- Loader -->
            <button class="complaintModal-btn" type="submit" style="background:#00BCD4; color:white; padding:10px; width:100%; border:none; border-radius:5px;">إرسال</button>
          </form>
          <div id="message" style="text-align:center; font-size:16px; color:#555; margin-top:10px;"></div> <!-- Message Div -->
          <button class="complaintModal-btn" onclick="document.getElementById('complaintModal').style.display='none';" style="background:#d52121; color:white; padding:10px; width:100%; border:none; border-radius:5px; margin-top:10px;">إغلاق</button>
           <div class="copywriter-footer">CDN Tool Developed By Ammar Alasfer</div>
        </div>
       
      </div>
    `;

    const modalDiv = document.createElement('div');
    modalDiv.innerHTML = modalHtml;
    document.body.appendChild(modalDiv);


    const attachmentButton = document.getElementById('attachmentButton');
    const attachmentInput = document.getElementById('attachmentInput');
    const attachmentFileName = document.getElementById('attachmentFileName');

    attachmentButton.onclick = () => attachmentInput.click();

    attachmentInput.onchange = () => {
      const fileName = attachmentInput.files.length > 0 ? attachmentInput.files[0].name : 'لم يتم اختيار ملف';
      attachmentFileName.textContent = fileName;
    };

    document.getElementById('complaintForm').onsubmit = (event) => this.submitComplaint(event);
  }

  openModal() {
    document.getElementById('complaintModal').style.display = 'flex';
  }

  submitComplaint(event) {
    event.preventDefault();

    const form = document.getElementById('complaintForm');
    const formData = new FormData(form);
    const loader = document.getElementById('loader');
    const messageDiv = document.getElementById('message'); 


    messageDiv.textContent = '';

 
    loader.style.display = 'block';


    fetch(this.apiUrl, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.text())
      .then(() => {
        messageDiv.textContent = 'تم إرسال الشكوى بنجاح!';
        messageDiv.style.color = 'green'; 
        form.reset();
      })
      .catch((error) => {
        messageDiv.textContent = 'حدث خطأ أثناء إرسال الشكوى.';
        messageDiv.style.color = 'red'; 
        console.error(error);
      })
      .finally(() => {
        loader.style.display = 'none';
      });
  }
}
