const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  try {
    if (!event.body || typeof event.body !== 'string') {
      throw new Error('Corpo da solicitação ausente ou inválido');
    }

    const { nome, email, nomeEmpresa, telefone } = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
        authMethod: 'PLAIN'
      }
    });

    const mailOptions = {
      from: 'appmail@techman.sh',
      to: 'comercial@techman.sh',
      subject: 'Novo formulário de contato',
      html: `
        <p>Nome: ${nome}</p>
        <p>Email: ${email}</p>
        <p>Nome da empresa: ${nomeEmpresa}</p>
        <p>Telefone: ${telefone}</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify({ message: 'Email enviado com sucesso: ' + info.response })
    };
  } catch (error) {
    console.error('Erro ao processar a solicitação:', error);
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify({ message: 'Erro ao processar a solicitação' })
    };
  }
};
