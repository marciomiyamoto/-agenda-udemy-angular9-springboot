package io.github.marciomiyamoto.agendaapi.model.repository;

import io.github.marciomiyamoto.agendaapi.model.entity.Contato;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContatoRepository extends JpaRepository<Contato, Integer> {
}
