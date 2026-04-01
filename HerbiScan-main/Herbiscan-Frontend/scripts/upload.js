$(document).ready(function () {
  const API_URL = 'http://localhost:8000/predict'; // Local backend
  const $uploadForm = $("#uploadForm");
  const $imageUpload = $("#imageUpload");
  const $imagePreview = $("#imagePreview");
  const $uploadBtn = $("#uploadBtn");
  const $uploadText = $("#uploadText");
  const $spinner = $("#spinner");
  const $results = $("#img-result");

  // Image preview and validation
  $imageUpload.on('change', function () {
    const file = this.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB
        alert('File too large! Max 10MB.');
        this.value = '';
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        this.value = '';
        return;
      }
      
      const reader = new FileReader();
      reader.onload = function (e) {
        $imagePreview.removeClass('hidden').html(`
          <div class="flex flex-col items-center space-y-4 p-6 bg-white rounded-3xl shadow-xl">
            <img id="previewImg" src="${e.target.result}" class="max-h-80 rounded-2xl shadow-2xl object-cover mx-auto border-4 border-emerald-200" alt="Preview">
            <div class="flex space-x-3">
              <button type="button" id="removeImg" class="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 font-medium text-sm">Remove</button>
              <button type="submit" class="px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
                Analyze Plant <i class="fas fa-rocket ml-2"></i>
              </button>
            </div>
          </div>
        `);
      };
      reader.readAsDataURL(file);
    }
  });

  // Remove preview
  $imagePreview.on('click', '#removeImg', function () {
    $imageUpload.val('');
    $imagePreview.addClass('hidden').empty();
  });

  // Upload form submit
  $uploadForm.on('submit', function (e) {
    e.preventDefault();
    
    const fileInput = $imageUpload[0];
    if (fileInput.files.length === 0) {
      showNotification('Please select an image first!', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    // Show loading
    $uploadText.text('Analyzing...');
    $spinner.removeClass('hidden');
    $uploadBtn.prop('disabled', true);

    $.ajax({
      url: API_URL,
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      timeout: 30000, // 30s timeout
      success: function (response) {
        showConfetti();
        showResult(response);
        showNotification('Plant identified successfully!', 'success');
      },
      error: function (xhr, status, error) {
        let errorMsg = 'Upload failed. ';
        if (status === 'timeout') {
          errorMsg += 'Request timed out. Try smaller image.';
        } else if (xhr.status === 0) {
errorMsg += 'Backend not running? cd "HerbiScan-main/HerbiScan-backend" && call venv\\Scripts\\activate.bat && uvicorn main:app --host 0.0.0.0 --port 8000 --reload';
        } else {
          errorMsg += xhr.responseJSON?.error || 'Server error.';
        }
        showNotification(errorMsg, 'error');
        console.error('Upload error:', errorMsg);
      },
      complete: function () {
        // Reset button
        $uploadText.text('Analyze Plant');
        $spinner.addClass('hidden');
        $uploadBtn.prop('disabled', false);
      }
    });
  });

  // Drag & drop
  const $uploadZone = $('#upload-zone');
  $uploadZone.on('dragover dragenter', function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).addClass('dragover border-emerald-500 bg-emerald-50/50');
  });
  $uploadZone.on('dragleave dragend', function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).removeClass('dragover border-emerald-500 bg-emerald-50/50');
  });
  $uploadZone.on('drop', function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).removeClass('dragover border-emerald-500 bg-emerald-50/50');
    
    const files = e.originalEvent.dataTransfer.files;
    if (files.length > 0) {
      $imageUpload[0].files = files;
      $imageUpload.trigger('change');
    }
  });

  // Notification system
  function showNotification(message, type = 'info') {
    const bgClass = type === 'success' ? 'bg-emerald-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    const $notif = $(`
      <div class="fixed top-6 right-6 z-50 p-4 rounded-2xl shadow-2xl text-white font-semibold max-w-sm transform translate-x-full ${bgClass} animate-slide-in">
        ${message}
      </div>
    `);
    $('body').append($notif);
    setTimeout(() => $notif.removeClass('translate-x-full').addClass('translate-x-0'), 100);
    setTimeout(() => $notif.fadeOut(), 4000);
  }

function showResult(response) {

  const plant = response.prediction || 'Unknown Plant';

  const uploadedFile = $("#imageUpload")[0].files[0];
  const imageURL = uploadedFile ? URL.createObjectURL(uploadedFile) : '';

  $results.html(`

  <div data-aos="zoom-in" class="bg-white rounded-3xl shadow-2xl p-10 max-w-4xl mx-auto">

    <div class="text-center mb-10">

      <img src="${imageURL}"
      class="w-40 h-40 object-cover rounded-2xl mx-auto shadow-lg mb-6 border-4 border-emerald-100">

      <h2 class="text-4xl font-bold text-emerald-700 mb-2">
        ${plant}
      </h2>

      <p class="text-gray-500 text-lg">
        Identified successfully
      </p>

    </div>

    <div class="grid md:grid-cols-2 gap-6">

      <div class="bg-gray-50 rounded-xl p-6 shadow-sm">
        <h3 class="font-semibold text-gray-700 mb-2">Benefits</h3>
        <p class="text-gray-600">${response.benefit || 'N/A'}</p>
      </div>

      <div class="bg-gray-50 rounded-xl p-6 shadow-sm">
        <h3 class="font-semibold text-gray-700 mb-2">Soil Type</h3>
        <p class="text-gray-600">${response.soil || 'N/A'}</p>
      </div>

      <div class="bg-gray-50 rounded-xl p-6 shadow-sm">
        <h3 class="font-semibold text-gray-700 mb-2">Appearance</h3>
        <p class="text-gray-600">${response.appearance || 'N/A'}</p>
      </div>

      <div class="bg-gray-50 rounded-xl p-6 shadow-sm">
        <h3 class="font-semibold text-gray-700 mb-2">Region</h3>
        <p class="text-gray-600">${response.region || 'N/A'}</p>
      </div>

    </div>

    <div class="mt-10 text-center">

      <button onclick="location.reload()"
      class="bg-emerald-600 text-white px-8 py-3 rounded-xl hover:bg-emerald-700 transition">

      Scan Another Plant

      </button>

    </div>

  </div>
  `);

  $('html, body').animate({ scrollTop: $results.offset().top - 100 }, 800);
}

  // Confetti effect
  function showConfetti() {
    for (let i = 0; i < 50; i++) {
      const confetti = $(`<div class="confetti absolute w-4 h-4 rounded-full opacity-75"></div>`).css({
        left: Math.random() * 100 + '%',
        backgroundColor: ['#10b981', '#34d399', '#059669', '#047857'][Math.floor(Math.random() * 4)],
        animationDelay: Math.random() * 0.5 + 's',
        animationDuration: (Math.random() * 2 + 2) + 's'
      });
      $('body').append(confetti);
      setTimeout(() => confetti.remove(), 4000);
    }
  }
});
