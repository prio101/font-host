<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class AddFontGroupFontsTable extends AbstractMigration
{
    /**
     * Change Method.
     *
     * Write your reversible migrations using this method.
     *
     * More information on writing migrations is available here:
     * https://book.cakephp.org/phinx/0/en/migrations.html#the-change-method
     *
     * Remember to call "create()" or "update()" and NOT "save()" when working
     * with the Table class.
     */
    public function change(): void
    {
        $table = $this->table('font_group_fonts_table');
        $table->addColumn('font_group_id', 'integer', ['null' => false, 'signed' => false])
              ->addColumn('font_id', 'integer', ['null' => false, 'signed' => false])
              ->addForeignKey('font_group_id', 'font_groups', 'id', ['delete' => 'CASCADE', 'update' => 'NO_ACTION'])
              ->addForeignKey('font_id', 'fonts', 'id', ['delete' => 'CASCADE', 'update' => 'NO_ACTION'])
              ->addColumn('font_size', 'integer', ['null' => true])
              ->addColumn('font_name', 'string', ['limit' => 255, 'null' => true])
              ->addColumn('created_at', 'timestamp', ['default' => 'CURRENT_TIMESTAMP'])
              ->addColumn('updated_at', 'timestamp', ['default' => 'CURRENT_TIMESTAMP'])
              ->addColumn('deleted_at', 'timestamp', ['null' => true])
              ->create();
    }
}
