<?php

  class Font {
    private int|null $id = null;
    private string $name;


    public function __construct(string $name) {
      $this->name = $name;
    }
    public function getId(): int|null {
      return $this->id;
    }
    public function setId(int $id): void {
      $this->id = $id;
    }
    public function getName(): string {
      return $this->name;
    }
    public function setName(string $name): void {
      $this->name = $name;
    }
    public function __toString(): string {
      return $this->name;
    }
    public function getFont(): string {
      return $this->name;
    }

  }
