/**
 * FemmeSuite Legal Document Loader
 * Fetches policy content from Supabase and renders it into the page.
 *
 * Usage: <div id="legal-content" data-documents="terms_of_service,tap_to_pay_terms"></div>
 *        <script src="legal-loader.js"></script>
 */
(function () {
  var SUPABASE_URL = 'https://kewofiqoezgrxfrasdeo.supabase.co';
  var SUPABASE_ANON_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtld29maXFvZXpncnhmcmFzZGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MjI2MTMsImV4cCI6MjA2ODM5ODYxM30.kXIfdCpXrqa4XZQmVjSp9-ig1sckU2MzH6glGOCiTGo';

  var container = document.getElementById('legal-content');
  if (!container) return;

  var docTypes = (container.getAttribute('data-documents') || '').split(',').map(function (s) {
    return s.trim();
  }).filter(Boolean);
  if (!docTypes.length) return;

  // Show loading state
  container.innerHTML = '<div class="panel legal-loading"><p>Loading…</p></div>';

  // Build query — fetch all matching document types ordered correctly
  var filter = docTypes.map(function (t) { return 'document_type.eq.' + t; }).join(',');
  var url = SUPABASE_URL + '/rest/v1/legal_documents?or=(' + filter + ')&order=document_type,section_order&select=document_type,section_order,title,body,is_header,effective_date';

  // Preserve the order specified in data-documents attribute
  var typeOrder = {};
  docTypes.forEach(function (t, i) { typeOrder[t] = i; });

  fetch(url, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: 'Bearer ' + SUPABASE_ANON_KEY,
    },
  })
    .then(function (res) {
      if (!res.ok) throw new Error('Failed to load legal documents');
      return res.json();
    })
    .then(function (rows) {
      if (!rows.length) {
        container.innerHTML = '<div class="panel legal-empty"><p>No documents found.</p></div>';
        return;
      }

      // Sort by the order specified in the data-documents attribute, then by section_order
      rows.sort(function (a, b) {
        var typeA = typeOrder[a.document_type] || 0;
        var typeB = typeOrder[b.document_type] || 0;
        if (typeA !== typeB) return typeA - typeB;
        return a.section_order - b.section_order;
      });

      var html = '';
      var currentType = '';

      rows.forEach(function (row) {
        // Add separator between document types
        if (row.document_type !== currentType) {
          if (currentType) html += '</div>'; // close previous panel
          currentType = row.document_type;
          html += '<div class="panel legal-document">';
        }

        if (row.is_header) {
          html += '<div class="legal-document-header">';
          html += '<h2 class="legal-document-title">' + esc(row.title) + '</h2>';
          if (row.effective_date) {
            html += '<p class="legal-document-meta">Effective ' + esc(row.effective_date) + '</p>';
          }
          row.body.forEach(function (p) {
            html += '<p class="legal-document-intro">' + esc(p) + '</p>';
          });
          html += '</div><div class="legal-divider"></div>';
        } else {
          html += '<h3 class="legal-section-title">' + esc(row.title) + '</h3>';
          row.body.forEach(function (p) {
            html += '<p class="legal-section-text">' + esc(p) + '</p>';
          });
        }
      });

      // Close last panel
      if (currentType) html += '</div>';

      container.innerHTML = html;
    })
    .catch(function (err) {
      console.error('Legal loader error:', err);
      container.innerHTML =
        '<div class="panel legal-error"><p>Unable to load legal documents. Please try again later.</p></div>';
    });

  function esc(str) {
    var el = document.createElement('span');
    el.textContent = str;
    return el.innerHTML;
  }
})();
