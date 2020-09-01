# Recuperação de Senhas

**RF**

-   O usuário deve poder recuperar sua senha informando seu email;
-   O usuário deve receber um email com instruções de recuperação de senha;
-   O usuário deve poder resetar sua senha;

**RNF**

-   Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
-   Utiliar Amazon SES para envios em produção;
-   O envio de emails deve acontecer em segundo plano (background jogs);

**RN**

-   O link enviado para resetar a senha deve expirar em duas horas;
-   O usuário precisa confirmar a nova senha para resetar sua senha;

# Atualização do Perfil

**RF**

-   O usuário deve poder atualizar seu nome, email e senha;

**RN**

-   O usuário não pode alterar seu email para um endereço já cadastrado;
-   Para atualizar sua senha o usuário deve informar a senha antiga;
-   Para atualizar sua senha o usuário precisa confirmar a nova senha;

# Painel do Barbeiro (Prestador)

# Agendamento de Serviços

**RF**

-   O usuário deve poder listar dosos os prestadores de serviço cadastrados;
-   O usuário deve poder listar os dias de um mês com pelo menos um horário disponível;
-   O usuário deve poder listar horários disponíveis em um dia específico de um prestador específico;
-   O usuário deve poder fazer um novo agendamento com um prestador;

**RNF**

-   A listagem de prestadores deve ser armazenada em cache;

**RN**

-   Cada agendamento deve durar 1 hora;
-   Agendamentos disponíveis sempre entre 8h00 e 18h00 (primeiro às 8 e último às 17);
-   Usuário não pode agendar um horário ocupado;
-   Usuário não pode agendar um horário no passado;
-   Usuário não pode agendar serviços consigo mesmo;
