describe('Paging component', () => {
  describe('with 8 items', () => {
    it('should show 3 pages', () => {

    });

    it('should have a disabled previous button', () => {

    });

    it('should have an enabled next button', () => {

    });

    it('should show selected page 1 with special style', () => {

    });

    it('should not let you change page number to 5', () => {

    });

    it('should not let you set page number to 0', () => {

    });

    describe('after clicking page 3', () => {
      it('should have an enabled previous button', () => {

      });

      it('should have an enabled next button', () => {

      });

      it('should show selected page 3 with special style', () => {

      });

      it('should show page 4', () => {

      });

      describe('and clicking next', () => {
        it('should have enabled previous button', () => {

        });

        it('should have disabled next button', () => {

        });
      });

      describe('and clicking previous twice', () => {

        it('should have disabled previous button', () => {

        });

        it('should have enabled next button', () => {

        });

        it('should show selected page 1 with special style', () => {

        });
      });
    });

    it('should default to last page if pageNumber set over', () => {

    });

    describe('binding changes', () => {
      it('should react properly when page size is changed', () => {

      });

      it('should react properly when maxPages is changed', () => {

      });

      it('should react properly when currentPage is changed', () => {

      });

      it('should react properly when itemCount is changed', () => {

      });
    })
  });
});
