$(document).ready(function() {
  $('#calendar').fullCalendar({
      header: {
          left: 'prev',
          center: 'title',
          right: 'next'
      },
      events: [
          {
              title: 'Event 1',
              start: '2023-11-27T10:00:00',
              end: '2023-11-27T12:00:00'
          },
          {
              title: 'Event 2',
              start: '2023-11-28T14:00:00',
              end: '2023-11-28T16:00:00'
          },
          // Add more events as needed
      ]
      // Additional options can be added here
  });
});