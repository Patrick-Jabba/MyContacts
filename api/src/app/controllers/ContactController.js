const ContactsRepository = require('../repositories/ContactsRepository');
require('express-async-errors');


class ContactController {
  async index(request, response) {
    //Index serve para LISTAR todos os registros
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);
    response.json(contacts);
  }

  async show(request, response) {
    // Para obter UM registro
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'User Not Found' })
    }

    response.json(contact);
  }

  async store(request, response) {
    //CRIAR um novo registro
    const { name, email, phone, category_id } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' })
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);
    if (contactByEmail) {
      return response.status(400).json({ error: 'This e-mail is already in use' })
    }

    const contact = await ContactsRepository.create({
      name, email, phone, category_id,
    });

    response.status(201).json(contact);
  }

  async update(request, response) {
    //ATUALIZAR um registro
    const { id } = request.params;
    const { name, email, phone, category_id } = request.body;

    const contactExists = await ContactsRepository.findById(id);
    if (!contactExists) {
      return response.status(404).json({ error: 'User Not Found' })
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' })
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);
    if (contactByEmail && contactByEmail.id !== id) {
      return response.status(400).json({ error: 'This e-mail is already in use' })
    }

    const contact = await ContactsRepository.update(id,
      {
        name, email, phone, category_id,
      });

    response.json(contact);
  }

  async delete(request, response) {
    //Deletar um registro
    const { id } = request.params;

    await ContactsRepository.delete(id);
    // 204 NO CONTENT
    response.sendStatus(204);
  }
}

// Singleton
module.exports = new ContactController();
