<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
// use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ContainerOut implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    // contents of output
    public $message;

    // public $container_id;

    public int $uid;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(int $user_id, ?array $message)
    {
        $this->message = $message;
        $this->uid = $user_id;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        // normally 'channel-name'
        return new Channel('term'.$this->uid);
    }
}
