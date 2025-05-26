/**
 * API service for handling contact form submissions
 */

interface ContactFormData {
  nome: string;
  email: string;
  empresa: string;
  mensagem: string;
}

/**
 * Submits contact form data to the API
 */
export async function submitContactForm(formData: ContactFormData) {
  try {
    // Create the authorization header for Basic Auth
    const authHeader = `Basic ${btoa('lupaService:Lupa@2025!!')}`;  
    
    const response = await fetch('https://dinastia-n8n-editor.ntr0nd.easypanel.host/webhook-test/solicitacao/novo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || response.statusText || 'Erro desconhecido');
    }
    
    return { success: true };
  } catch (error: any) {
    console.error('Erro ao enviar formulário:', error);
    return { 
      success: false, 
      error: error.message || 'Erro ao enviar solicitação. Por favor, tente novamente mais tarde.'
    };
  }
}
